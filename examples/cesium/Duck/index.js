var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false
});                               

var scene = viewer.scene;

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(139.691706, 35.689487, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 20000
        }
    });
    viewer.trackedEntity = entity;
}

function flyToHeadingPitchRoll() {
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(139.691706 + 0.4, 35.689487 - 1.0, 100000.0),
        orientation : {
            heading : Cesium.Math.toRadians(-20.0),
            pitch : Cesium.Math.toRadians(-35.0),
            roll : 0.0
        }
    });
}

var heading = 0;
var pitch = 0;
var roll = 0;

function tick() {
    scene.render();
    var lon = 139.691706; // the updated lon
    var lat = 35.689487; // updated lat
    var height = 0;
    var position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    heading -= 0.1;

    // create an orientation based on the new position
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);
    viewer.trackedEntity.orientation = orientation;

    Cesium.requestAnimationFrame(tick);
}

createModel('../../../sampleModels/Duck/glTF-Embedded/Duck.gltf', 10000);

flyToHeadingPitchRoll();

tick();
