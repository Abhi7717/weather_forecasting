const { log } = require("console");
const express = require("express")
const https = require("https")
const bodyParser=require("body-parser")
const app = express();
// app.use(express.static("public"));
// let urll="";
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    // console.log(req.body.cityName)
    const query=req.body.cityName
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4fc56c42c8eba8f25fb55e31e25fe6cf&units="+unit
    // urll=url;
    https.get(url,function(response)
    {
        console.log(response.statusCode)

        response.on("data",function(data)
        {
            // console.log(data)
            const weatherdata=JSON.parse(data)
            // console.log(weatherdata)

            const temp=weatherdata.main.temp;
            // const temp=weatherdata.main.feels_like;// this is not working
            // console.log(temp)

            const weatherdesc=weatherdata.weather[0].description
            const icon=weatherdata.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            // console.log("weather desc = "+weatherdesc)

        //     const obj={
        //         name: "abhijit",
        //         favfood: "kichri"
        //     }
        //    console.log( JSON.stringify(obj))
        
        res.write("<h1>the weather desc of "+query+" is = "+weatherdesc+"</h1>")
        res.write("<h1>the temperature in "+query+" is = "+temp+"°C</h1>")
        res.write("<img src="+imageURL+">")
        res.send()
        })

        // Logic to determine the appropriate CSS class based on weather description
        // response.on("end", function (data) {
        //     const weatherdata = JSON.parse(data);
        //     const weatherdesc = weatherdata.weather[0].description.toLowerCase();
            
    
        //  let weatherClass = "default";
        //  if (weatherdesc.includes("clear")) {
        //      weatherClass = "clear";
        //  } else if (weatherdesc.includes("haze")) {
        //      weatherClass = "haze";
        //     weatherClass='cloud-blue-sky.jpg'
        //     console.log("abhijit")
            
        // } 
        // else if (weatherdesc.includes("cloud")) {
        //     weatherClass = "cloud";
        // } else if (weatherdesc.includes("rain")) {
        //      weatherClass = "rain";
        //  }
        //  // Add more conditions for other weather descriptions
 
        // //  document.body.className = weatherClass;

        //  // Send the HTML response with the appropriate CSS class
        // //  res.write('<link rel="stylesheet" type="text/css" href="style.css">');
        // //  res.write('<body class="' + weatherClass + '">');
        // //    document.body.style.backgroundImage = `url(${weatherClass})`;
        // })

       
    })
   
    console.log("post request received")
})


// In this setup, the Node.js code makes the API request using https.get and then extracts the relevant weather data. However, Node.js cannot directly change the background image of the browser as it runs on the server-side. Instead, it sends the weather data to the client-side using Express.js to serve the HTML file and JSON data. The client-side JavaScript code (the one in weather-script.js) is responsible for updating the background image and displaying the weather information based on the data received from the server.

// To run this code, you need to have Node.js installed on your system. Save the above code in separate files (index.html and weather-script.js) and create a new directory called public in the same location as the files. Put your weather images (default-image.jpg, clear-image.jpg, etc.) inside the public directory. Then, execute the Node.js script using the command node weather-script.js. This will start the server on port 4000. Open your browser and navigate to http://localhost:4000 to see the Weather App.






// Regenerate



app.listen(4000, function () {
    console.log("server is running")
})




