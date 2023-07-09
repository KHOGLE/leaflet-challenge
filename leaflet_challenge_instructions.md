# Instructions

The instructions for this activity are broken into two parts:
- Part 1: Create the Earthquake Visualization
- Part 2: Gather and Plot More Data (optional with no extra points earning)

## Part 1: Create the Earthquake Visualization

![basicMap](Images/2-BasicMap.png)

Your first task is to visualize and earthquake dataset. Complete the following steps:

1. Get your dataset. To do so, follow these steps:
    - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize. The following image is an example screenshot of what appear when you visit this link: 
    ![USGS](Images/3-Data.png)

    - When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:
    ![JSON](Images/4-JSON.png)

2. Import and visualize the data by doing the following:
    - Using leaflet, create a map that plots all the earthquakes from your dataset baesd on their longitude and latitude.
        - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color. 
        - **Hint**: The depth of the earth can be found as the third coordinate for each earthquake. 
    - Include popups that provide additional information about the earthquake when its associated marker is clicked. 
    - Create a legend that will provide context for your map data
    - Your visualization should look something like the preceding map. 

## Part 2: Gather and Plot More Data (Optional with no extra points earning)

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongisde you original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.

This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills. 

The following image is an example screenshot of what you should produce: 

[tectonics](Images/5-Advanced.png)

Perform the following tasks: 
- Plot the tectonic plates dataset on the map in addition to the earthquakes. 
- Add other base maps to choose from 
- Put each dataset into separate overlays that can be turned on and off independently
- Add layer controls to your map. 

# Requirements 

These requirements apply only to part 1. 

## Map (60 points)
- TileLayer loads without error (20 points)
- Connects to geojson API using D3 without error (20 points)
- Markers with size corresponding to earthquake magnitude (10 points)
- A legend showing the depth and their corresponding color (10 points)

## Data Points (40 points)
- Data points scale with magnitude level (10 points)
- Data points colors change wit hdepth level (10 points)
- Each point has a tooltip with the Magnitude, the location and depth. (10 points)
- All data points load in the correct locations (10 points)