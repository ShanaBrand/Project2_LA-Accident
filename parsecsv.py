# Import libraries
import csv
import pymysql
import datetime
# Connect to the database
mydb = pymysql.connect(host='localhost',
                             user='root',
                             password='root',
                             db='la_collisions_db',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

# Establish cursor
cursor = mydb.cursor()
cursor.execute('DROP TABLE IF EXISTS traffic_tbl')

create_table_query = """
CREATE TABLE `la_collisions_db`.`traffic_tbl` (
  `id` INT(11) unsigned NOT NULL AUTO_INCREMENT,
  `date_occurred` DATE NOT NULL,
  `year_occur` INT(4) NOT NULL,
  `month_occur` INT(2) NOT NULL,
  `day_occur` INT(2) NOT NULL,
  `time_occurred` INT(2) NOT NULL,
  `victim_age` INT(4) NOT NULL,
  `victim_sex` VARCHAR(6) NULL,
  `victim_descent` VARCHAR(6) NULL,
  `latitude` DOUBLE(16,14) NOT NULL,
  `longitude` DOUBLE(17,14)NOT NULL,
  PRIMARY KEY (`id`)
  )ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 
"""

print("Creating database...")
cursor.execute(create_table_query)


# Read the csv file and reference it in the variable, csv_data
csv_data = csv.reader(open('LAtraffic_clean.csv', newline=''))
next(csv_data, None)
# Print data to console
for row in csv_data:
	date_occurred = row[1]
	year_occur = row[2]
	month_occur = row[3]
	day_occur = row[4]
	time_occurred = row[5]
	victim_age = row[6]
	victim_sex = row[7]
	victim_descent = row[8]
	latitude = row[9]
	longitude = row[10]
	
	#try:
		#date_occurred = datetime.datetime.strptime(date_occurred, "%Y-%m-%d")
	#except ValueError:
	#	continue
		
	print(row)
	
	insert_statement = """INSERT INTO traffic_tbl
(`date_occurred`, `year_occur`, `month_occur`, `day_occur`, `time_occurred`, `victim_age`, `victim_sex`,`victim_descent`, `latitude`,`longitude`)
VALUES
("%s", %s, %s, %s, %s, %s, "%s", "%s", %s, %s)""" %(date_occurred,year_occur,month_occur,day_occur,time_occurred,victim_age,victim_sex,victim_descent,latitude,longitude)


#print(insert_statement)
	cursor.execute(insert_statement)

			 
		 
# close the connection to the database.
mydb.commit()
cursor.close()
print ("Done")




