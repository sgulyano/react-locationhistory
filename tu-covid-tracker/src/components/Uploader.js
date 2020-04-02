import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateHeatmap } from './Redux/actions.js'
import './Uploader.css';

function status(message) {
  console.log(message)
}

// function parseKMLFile(file) {
//   var fileSize = file.size;
//   var reader = new FileReader();
//   reader.onprogress = function (e) {
//     var percentLoaded = Math.round((e.loaded / e.total) * 100);
//     status(percentLoaded + '% of ' + fileSize + ' loaded...');
//   };

//   reader.onload = function (e) {
//     var latlngs;
//     status('Generating map...');
//     latlngs = getLocationDataFromKml(e.target.result);
//     // heat._latlngs = latlngs;
//     // heat.redraw();
//     // stageThree(latlngs.length);
//   }
//   reader.onerror = function () {
//     status('Something went wrong reading your JSON file. Ensure you\'re uploading a "direct-from-Google" JSON file and try again, or create an issue on GitHub if the problem persists. ( error: ' + reader.error + ' )');
//   }
//   reader.readAsText(file);
// }

function getLocationDataFromKml(data) {
  var KML_DATA_REGEXP = /<Placemark>(.*?)<\/Placemark>/g,
    KML_DETAIL_DATA_REGEXP = /<name>(.*?)<\/name>.*?<coordinates>(.*?)<\/coordinates>.*?<TimeSpan><begin>(.*?)<\/begin><end>(.*?)<\/end><\/TimeSpan>/,
    KML_COORD_DATA_REGEXP = /(-?\d{1,3}(\.\d+)?),(-?\d{1,3}(\.\d+)?),(-?\d{1,3}(\.\d+)?)/g,
    locations = [],
    places = [],
    match = KML_DATA_REGEXP.exec(data);

  // match
  //  [ 1 ] ISO 8601 timestamp
  //  [ 2 ] longitude
  //  [ 3 ] latitude
  //  [ 4 ] altitude ( not currently provided by Location History )

  while (match !== null) {
    places.push(match)
    let details = KML_DETAIL_DATA_REGEXP.exec(match[1]);

    KML_COORD_DATA_REGEXP.lastIndex = 0
    let coord = KML_COORD_DATA_REGEXP.exec(details[2]);
    while (coord !== null) {
      let lon = coord[1]
      let lat = coord[3]
      // locations.push([Number(lat), Number(lon)]);
      locations.push({lat:Number(lat), lng:Number(lon), count:1});
      coord = KML_COORD_DATA_REGEXP.exec(details[2]);
    }

    // locations.push([Number(match[3]), Number(match[2])]);
    match = KML_DATA_REGEXP.exec(data);
  }
  status('Load ' + places.length + ' places, ' + locations.length + ' points...');
  return locations;
}


function Uploader({ updateHeatmap }) {

  const [selectedFile, setselectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked `;

    let file = selectedFile
    if (file && uploading) {
      var fileSize = file.size;
      var reader = new FileReader();
      reader.onprogress = function (e) {
        var percentLoaded = Math.round((e.loaded / e.total) * 100);
        status(percentLoaded + '% of ' + fileSize + ' loaded...');
      };

      reader.onload = function (e) {
        var latlngs;
        status('Generating map...');
        latlngs = getLocationDataFromKml(e.target.result);
        updateHeatmap(latlngs)
        // heat._latlngs = latlngs;
        // heat.redraw();
        // stageThree(latlngs.length);
      }
      reader.onerror = function () {
        status('Something went wrong reading your JSON file. Ensure you\'re uploading a "direct-from-Google" JSON file and try again, or create an issue on GitHub if the problem persists. ( error: ' + reader.error + ' )');
      }
      reader.readAsText(file);
    }
    // updateHeatmap(null)
    setUploading(false)
  }, [uploading]);

  var onChangeHandler = event => {
    console.log(event.target.files[0])
    setselectedFile(event.target.files[0])
  }

  var onClickHandler = () => {
    // parseKMLFile(selectedFile)
    setUploading(true)
  }


  return (
    <div id="uploader">

      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Upload File
      </button>


      <div class="modal show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Upload Your File</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <p>
                  Hello please upload your location
                </p>
              </div>
              <div>
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <form method="post" action="#" id="#">
                        <div class="form-group files">
                          <input type="file" name="file" onChange={onChangeHandler} />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary btn-block" data-dismiss="modal" onClick={onClickHandler}>Upload</button>
            </div>
          </div>
        </div>
      </div>


      {/* <div>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <form method="post" action="#" id="#">
                <div class="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" name="file" onChange={onChangeHandler} />
                </div>
                <button type='button' class='btn btn-primary btn-block' onClick={onClickHandler}>Upload</button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default connect(null, {
  updateHeatmap
})(Uploader)
