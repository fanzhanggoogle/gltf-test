var engines = [{
    name: 'Three.js',
    path: 'examples/threejs/index.html?category={category}&model={model}&scale={scale}&type={type}'
}];

function getEngineByName(name) {
    var result;
    var numEngines = engines.length;
    for (var i = 0; i < numEngines; ++i) {
        if (engines[i].name == name ) {
            break;
        }
    }
    return engines[i];
}

function makeSampleModelLinks() {
    var modelList = ModelIndex.List;
    var numModels = modelList.length;
    var numEngines = engines.length;

    var tableHead = document.querySelector('#modelTable thead tr');
    var tableBody = document.querySelector('#modelTable tbody');

    var i, j;
    for (i = 0; i < numEngines; ++i) {
        var th = document.createElement('th');
        th.textContent = engines[i].name;
        tableHead.appendChild(th);
    }

    for (j = 0; j < numModels; ++j) {
        var modelName = modelList[j].name;
        var scale = modelList[j].scale;
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        tdName.textContent = modelName;
        tr.appendChild(tdName);
        var tdPic = document.createElement('td');
        var img = document.createElement('img');
        img.setAttribute('src', 'sampleModels/' + ModelIndex.getScreenshot(modelName));
        tdPic.appendChild(img);
        tr.appendChild(tdPic);
        for (i = 0; i < numEngines; ++i) {
            var td = document.createElement('td');
            td.appendChild(createlink(engines[i].name, 'sampleModels', modelName, 'glTF', scale));
            td.appendChild(document.createElement('br'));
            td.appendChild(createlink(engines[i].name, 'sampleModels', modelName, 'glTF-Draco', scale));
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
}

function createlink(engineName, categoryName, modelName, type, scale)
{
    var a = document.createElement('a');
    a.textContent = type;
    //var uri = engines[i].path;
    var engine = getEngineByName(engineName);
    var uri = engine.path;
    uri = uri.replace('{category}', categoryName);
    uri = uri.replace('{model}', modelName);
    uri = uri.replace('{type}', type);
    uri = uri.replace('{scale}', scale);
    a.setAttribute('href', uri);
    a.setAttribute('target', '_blank');
    return a;
}

makeSampleModelLinks();
