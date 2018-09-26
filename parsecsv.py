# Import libraries
import csv
import pymysql

# Connect to the database
mydb = pymysql.connect(host='localhost',
                             user='root',
                             password='mtzion77!',
                             db='la_collisions_db',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

# Establish cursor
cursor = mydb.cursor()
cursor.execute('DROP TABLE IF EXISTS traffic_tbl')
cursor.execute('CREATE TABLE traffic_tbl(dr_number VARCHAR(12),date_occurred VARCHAR(45),year_occur VARCHAR(45),\
  month_occur VARCHAR(45),day_occur VARCHAR(45),time_occurred VARCHAR(45),victim_age VARCHAR(45),victim_sex VARCHAR(45),victim_descent VARCHAR(45),\
  latitude VARCHAR(45),longitude VARCHAR(45),PRIMARY KEY (dr_number))')

# Read the csv file and reference it in the variable, csv_data
csv_data = csv.reader(open('LAtraffic_clean.csv', newline=''))

# Print data to console
for row in csv_data:
	print(row)
	cursor.execute('INSERT INTO traffic_tbl(dr_number, \
		 date_occurred,year_occur,month_occur,day_occur,time_occurred,victim_age,victim_sex,victim_descent,latitude,longitude)'
         'VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
         row)
# close the connection to the database.
mydb.commit()
cursor.close()
print ("Done")	 	
