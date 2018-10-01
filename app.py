from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
from flask import url_for
from flask import render_template

from sqlalchemy import Column, Integer, String, Float, Enum, DateTime, ForeignKey, VARCHAR, Date 
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import text
import pymysql
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

pymysql.install_as_MySQLdb()

# Database Connection
username = 'root'
password = 'root'
host = 'localhost'
port = 3306
database = 'la_collisions_db'

# Format:
# `<Dialect>://<Username>:<Password>@<Host Address>:<Port>/<Database>`
# Using f-string notation: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
connection = f"mysql://{username}:{password}@{host}:{port}/{database}"


engine = create_engine(connection)
conn = engine.connect()
session = Session(bind=engine)

app = Flask(__name__, static_folder='./static', static_url_path='')

class Accident(Base):
    __tablename__ = 'traffic_tbl'
    id = Column(Integer, primary_key=True)
    date_occurred = Column(Date)
    year_occur = Column(Integer)
    month_occur = Column(Integer)
    day_occur = Column(Integer)
    time_occurred = Column(Integer)
    victim_age = Column(Integer)
    victim_sex = Column(VARCHAR(6))
    victim_descent = Column(VARCHAR(6))
    latitude = Column(Float)
    longitude = Column(Float)


    @property
    def serialize(self):
        """
        Return object data in easily serializeable format
        See https://stackoverflow.com/questions/7102754/jsonify-a-sqlalchemy-result-set-in-flask
        """
        return {
            'id': self.id,
            'type': 'accident',
            'attributes': {
                'id': self.id,
                'date_occurred': self.date_occurred,
                'year_occur': self.year_occur,
                'month_occur': self.month_occur,
                'time_occurred': self.time_occurred,
                'day_occur': self.day_occur,
                'victim_age': self.victim_age,
                'victim_sex': self.victim_sex,
                'victim_descent': self.victim_descent,
                'latitude': self.latitude,
                'longitude': self.longitude,
            }

        }

from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/visuals')
def myVisuals():
    return render_template('chart.html')  

@app.route('/home')
def home():
    return render_template('home.html')

@app.route("/data")
def accident_data():
    return render_template('data.html')

@app.route("/age")
def age():
    return render_template('age.html')

@app.route("/gender")
def gender():
    return render_template('gender.html')

@app.route("/leaflet")
def leaflet():
    return render_template('leaflet.html')

@app.route("/summary")
def summary():
    return render_template('summary.html')

@app.route("/descent")
def time():
    return render_template('descent.html')

@app.route("/year")
def year():
    return render_template('year.html')

# Warning! This generates a huge response!
@app.route("/api/accidents")
def all_accidents():
    accidents = session.query(Accident)
    return jsonify(
        data=[a.serialize for a in accidents],
        links={
            'self': str(request.url_rule)
        }

    )
#data from only 2018
# @app.route("/api/accidents/2018")
# def accidents2018():
#     accidents2018 = session.query(Accident).filter(Accident.year_occur == 2018)
#     return jsonify(
#         data=[a.serialize for a in accidents2018],
#         links={
#             'self': str(request.url_rule)
#         }
#     )

#data by year
@app.route("/years")
def yearsdata():
    mYears =[r.year_occur for r in session.query(Accident.year_occur).distinct()]
    return jsonify(mYears)


#Routes for PLOTLY VISUALS --do not need to display
@app.route("/accidents/byYear")
def accidentsSum():
    results = []
    yrlSum = conn.execute(text('SELECT year_occur, COUNT(*) as NumAccidents FROM traffic_tbl GROUP BY year_occur ORDER BY year_occur DESC'))
    print('yrlsum:', yrlSum)
    for row in yrlSum:
        print(row)
        results.append([row[0], row[1]])
    print('results', results)
    format_results = [{"year_occur":row[0],"num_accidents":row[1]}for row in results]
    return jsonify(format_results)
  

#data by area
@app.route("/accidents/byArea")
def accidentbyArea():
    results = []
    area_sum = conn.execute(text('SELECT area_name,COUNT(*) as num_accidents FROM traffic_tbl GROUP BY area_name ORDER BY num_accidents DESC'))
    print('area_sum:', area_sum)
    for row in area_sum:
        print(row)
        results.append([row[0], row[1]])
    print('results', results)
    format_results = [{"area_name":row[0],"num_accidents":row[1]}for row in results]
    return jsonify(format_results)
  
#data by descent 
@app.route("/accidents/byDescent")
def accidentbyDes():
    results = []
    descent_sum = conn.execute(text('SELECT victim_descent,COUNT(*) as num_accidents FROM traffic_tbl GROUP BY victim_descent ORDER BY num_accidents DESC'))
    print('victim_descent:', descent_sum)
    for row in descent_sum:
        print(row)
        results.append([row[0], row[1]])
    print('results', results)
    format_results = [{"victim_descent":row[0],"num_accidents":row[1]}for row in results]
    return jsonify(format_results)
  
    # return jsonify(json_list = area_sum)

#data by gender 
@app.route("/accidents/bySex")
def accidentbySex():
    results = []
    v_sex = conn.execute(text('SELECT victim_sex,COUNT(*) as num_accidents FROM traffic_tbl GROUP BY victim_sex ORDER BY num_accidents DESC'))
    print('victim_sex:', v_sex)
    for row in v_sex:
        print(row)
        results.append([row[0], row[1]])
    print('results', results)
    format_results = [{"victim_sex":row[0],"num_accidents":row[1]}for row in results]
    return jsonify(format_results)


if __name__ == "__main__":
    app.run(debug=True)
