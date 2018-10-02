# Project2_LA-Accident
**Project Overview**

This project utilized traffic accident data in Los Angeles from January of 2010 to September of 2018 to look at the frequency of accidents over that time, differences among victims across age, ethnitiy, and gender. There is also a leaflet.js map which allows the user to view 1,000 accident points at a time. The data came from the City of Los Angeles and can be accessed at the following link. 

https://data.lacity.org/A-Safe-City/Traffic-Collision-Data-from-2010-to-Present/d5tf-ez2w

**Tools Utilized**
The website includes several pages with visualizations built from d3, plotly, and leafletjs. The style utilizes css and choreagrapher.js. The site is hosted on Flask and includes a MySQL database for hosting API data. 

**How to Deploy Using Flask**
1. Clone the full repo. 
2. Run the parse_csv.py file. Ensure you have a MySQL server active and add your local credentials to the file before running. 
3. After the database is created, update your local credentials on the app.py file before running it to host the site locally.       