import os
from dotenv import load_dotenv
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
import pymysql
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

pymysql.install_as_MySQLdb()

# Database Connection
username = os.getenv("DATABASE_USERNAME")
password = os.getenv("DATABASE_PASSWORD")
host = os.getenv("DATABASE_HOST")
port = os.getenv("DATABASE_PORT")
database = os.getenv("DATABASE_NAME")

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
            # 'links': {
            #     'self': url_for('api_all_accidents', id=self.dr_number, _external=True)
            # }
        }

from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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

@app.route("/time")
def time():
    return render_template('time.html')

@app.route("/year")
def year():
    return render_template('year.html')

# @app.route('/sightings/<int:id>', methods=['GET'])
# def get_sightings(id):
#     return render_template('one_sighting.html')

# Warning! This generates a huge response!!!
# TODO: can we drop the pins via pagination?
@app.route("/api/accidents")
def all_accidents():
    accidents = session.query(Accident)
    return jsonify(
        data=[a.serialize for a in accidents],
        links={
            'self': str(request.url_rule)
        }

    )

@app.route("/api/accidents/2018")
def accidents2018():
    accidents2018 = session.query(Accident).filter(Accident.year_occur == 2018)
    return jsonify(
        data=[a.serialize for a in accidents2018],
        links={
            'self': str(request.url_rule)
        }

    )

# @app.route("/api/accidents/<int:id>")
# def api_one_accident():
#     accidents = session.query(Accident)
#     return jsonify(
#         data=[a.serialize for a in accidents],
#         links={
#             'self': str(request.url_rule)
#         }

#     )


if __name__ == "__main__":
    app.run(debug=True)
