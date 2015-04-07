/*
*
* Wrapper class for MongoDB instance, abstracting away
* REST interface for some basic operations, for CS 495 Capstone project.
* 
* When calling these, one should keep in mind that these functions, 
* since they are inherently asynchronous, make promises to be later fulfilled.
* Thus, you should call each like "mongoFunc(...).after(functionToCallOnceFinished() {...});".
* Basically, specify what should be done once the mongo request finishes, and go from there.
*
*/
// we're assuming jquery is already included.

var baseUrl = "https://api.mongolab.com/api/1";
/* so yeah, maybe this key shouldn't just be sitting here...
* for now, whatever. maybe later we can save it encrypted, 
* and decrypt it before we use it? that's slightly better than nothing. */
var ourKey = "gM0pp-zc-_PDhEGzCAGLxs6j9EgjWfPv";

function listCollections(dbName)
{
	// GET /databases/{database}/collections

	var ajaxUrl = baseUrl + "/databases/" + dbName + "/collections";

	console.log("listCollections: sending GET to " + ajaxUrl);

	/*
	// here we make a promise to the caller that we will
	// give them the response when it's ready. trust me.
	// caller should then use listCollections().then(function(data)...)
	// or listCollections().success(function(data)...) to get at results
	*/

	return $.get(ajaxUrl,
				{apiKey:ourKey});
};


function getAllDocuments(dbName, collectionName)
{
	// GET /databases/{database}/collections/{collection}
	var ajaxUrl = baseUrl + "/databases/" + dbName 
				+ "/collections/" + collectionName ;

	console.log("getAllDocuments: sending GET to " + ajaxUrl);

	/*
	// here we make a promise to the caller that we will
	// give them the response when it's ready. trust me.
	// caller should then use listCollections().then(function(data)...)
	// or listCollections().success(function(data)...) to get at results
	*/

	return $.get(ajaxUrl,
				{apiKey:ourKey});

};


function getDocsWithQuery(dbName, collectionName, query)
{
	// retrieve docs that match query where query is something like 
	// "{'attr':'attrVal','attr2':'attr2Val',....}"

	//GET /databases/{database}/collections/{collection}

	var ajaxUrl = baseUrl + "/databases/" + dbName 
				+ "/collections/" + collectionName;

	console.log("getDocsWithQuery: sending GET to " + ajaxUrl);

	/*
	// here we make a promise to the caller that we will
	// give them the response when it's ready. trust me.
	// caller should then use listCollections().then(function(data)...)
	// or listCollections().success(function(data)...) to get at results
	*/

	return $.get(ajaxUrl,
				{q:query, apiKey:ourKey});
};


function updateDocById(dbName, collectionName, docId, attrJson)
{
	// given JSON containing attr:attrVal pairs, updates the doc with id of docId
	
	// PUT /databases/{database}/collections/{collection}/{_id}
	
	var ajaxUrl = baseUrl + "/databases/" + dbName 
				+ "/collections/" + collectionName
				+ "/" + docId
				+ "?apiKey=" + ourKey;

	console.log("updateDocById: sending POST to " + ajaxUrl);

	/*
	// here we make a promise to the caller that we will
	// give them the response when it's ready. trust me.
	// caller should then use listCollections().then(function(data)...)
	// or listCollections().success(function(data)...) to get at results
	*/

	var updateJson = {"$set":attrJson};

	return $.ajax({url: ajaxUrl,
					data: JSON.stringify(updateJson),
					type: "PUT",
		  			contentType: "application/json"});
};


function insertDocument(dbName, collectionName, docJson)
{
	// given JSON for a document, add the document to the given collection

	//POST /databases/{database}/collections/{collection}

	var ajaxUrl = baseUrl + "/databases/" + dbName 
				+ "/collections/" + collectionName + "?apiKey=" + ourKey;

	console.log("insertDocument: sending POST to " + ajaxUrl);

	/*
	// here we make a promise to the caller that we will
	// give them the response when it's ready. trust me.
	// caller should then use listCollections().then(function(data)...)
	// or listCollections().success(function(data)...) to get at results
	*/

	return $.ajax({url: ajaxUrl,
					data: JSON.stringify(docJson),
					type: "POST",
		  			contentType: "application/json"});
};


function deleteDocById(dbName, collectionName, docId)
{
	// DELETE /databases/{database}/collections/{collection}/{_id}

	var ajaxUrl = baseUrl + "/databases/" + dbName 
				+ "/collections/" + collectionName
				+ "/" + docId
				+ "?apiKey=" + ourKey;

	console.log("deleteDocById: sending DELETE to " + ajaxUrl);

	/*
	// here we make a promise to the caller that we will
	// give them the response when it's ready. trust me.
	// caller should then use listCollections().then(function(data)...)
	// or listCollections().success(function(data)...) to get at results
	*/

	return $.ajax({url: ajaxUrl,
			  		type: "DELETE",
			  		async: true,
			  		timeout: 300000});
};





/******************************************************************************
* testing code down here... this is not rigorous, just making sure it works.
******************************************************************************/
var testing = false; // set to true if you want to run these test functions.

function testListCollections()
{
	// listCollections makes us a promise to return the list
	// we have to use "then" to wait for promise to be fulfilled.
	listCollections("wwystest").then(
					function(collections)
					{
						console.log("testing listCollections");
						for (var x in collections)
						{
							console.log("collection " + x + ":" + collections[x]);
						}
						console.log("\n");
					},
					function(error)
					{
						// TODO: write me... what should we do here?
						console.log("listCollections AJAX call failed.");
						console.log(error);
					}
	);
}

function testGetAllDocuments()
{
	getAllDocuments("wwystest", "dummy").then(
					function(documents)
					{
						console.log("testing getAllDocuments");
						for (var x in documents)
						{
							// print our document's fields
							var curDocument = documents[x];
							console.log("document " + x + ":");
							console.log("\tid:" + curDocument._id.$oid);
							console.log("\ttest1:" + curDocument.test1);
							console.log("\ttest2:" + curDocument.test2);
							console.log("\ttest3:" + curDocument.test3);
						}
						console.log("\n");
					},
					function(error)
					{
						// TODO: write me... what should we do here?
						console.log("getAllDocuments AJAX call failed.");
						console.log(error);
					}
	);
}

function testGetDocsWithQuery()
{
	getDocsWithQuery("wwystest", "dummy", JSON.stringify({'test1':'TEST1'})).then(
					function(documents)
					{
						console.log("testing getDocsWithQuery");
						for (var x in documents)
						{
							// print our document's fields
							var curDocument = documents[x];
							console.log("document " + x + ":");
							console.log("\tid:" + curDocument._id.$oid);
							console.log("\ttest1:" + curDocument.test1);
							console.log("\ttest2:" + curDocument.test2);
							console.log("\ttest3:" + curDocument.test3);
						}
						console.log("\n");
					},
					function(error)
					{
						// TODO: write me... what should we do here?
						console.log("getDocsWithQuery AJAX call failed.");
						console.log(error);
					}
	);
}

function testInsertDocument()
{
	console.log("testing insertDocument");
	var newDocJson = {"test1":"TEST1", "test2":"this is test2", "test3":"yeppp"};
	insertDocument("wwystest", "dummy", newDocJson);

	getDocsWithQuery("wwystest", "dummy", JSON.stringify({'test1':'TEST1'})).then(
					function(documents)
					{
						console.log("listing docs... the doc we just inserted should appear");
						for (var x in documents)
						{
							// print our document's fields
							var curDocument = documents[x];
							console.log("document " + x + ":");
							console.log("\tid:" + curDocument._id.$oid);
							console.log("\ttest1:" + curDocument.test1);
							console.log("\ttest2:" + curDocument.test2);
							console.log("\ttest3:" + curDocument.test3);
						}
						console.log("\n");
					},
					function(error)
					{
						// TODO: write me... what should we do here?
						console.log("getDocsWithQuery AJAX call failed from testInsertDocument.");
						console.log(error);
					}
	);
		
	
}

function testDeleteDocById()
{
	console.log("testing deleteDocById");

	getDocsWithQuery("wwystest", "dummy", JSON.stringify({'test1':'TEST1'})).then(
					function(documents)
					{
						console.log("listing docs... the doc we just inserted should appear");

						// print our document's fields
						var curDocument = documents[0];
						console.log("going to delete document:");
						console.log("\tid:" + curDocument._id.$oid);
						console.log("\ttest1:" + curDocument.test1);
						console.log("\ttest2:" + curDocument.test2);
						console.log("\ttest3:" + curDocument.test3);

						deleteDocById("wwystest", "dummy", curDocument._id.$oid);
						
						console.log("\n");
					},
					function(error)
					{
						// TODO: write me... what should we do here?
						console.log("getDocsWithQuery AJAX call failed from testInsertDocument.");
						console.log(error);
					}
	);
		
	
}

function testUpdateDocById()
{
	console.log("testing updateDocById");

	getDocsWithQuery("wwystest", "dummy", JSON.stringify({'test2':'test2 data'})).then(
					function(documents)
					{
						console.log("listing docs... the doc we just inserted should appear");

						// print our document's fields
						var curDocument = documents[0];
						console.log("going to update document:");
						console.log("\tid:" + curDocument._id.$oid);
						console.log("\ttest1:" + curDocument.test1);
						console.log("\ttest2:" + curDocument.test2);
						console.log("\ttest3:" + curDocument.test3);

						var newTest1 = new Date().getTime() / 1000;
						console.log("going to set test1 to " + newTest1)
						updateDocById("wwystest", "dummy", curDocument._id.$oid,
										{"test1":newTest1});
						
						console.log("\n");
					},
					function(error)
					{
						// TODO: write me... what should we do here?
						console.log("getDocsWithQuery AJAX call failed from testInsertDocument.");
						console.log(error);
					}
	);
}

if (testing)
{
	testListCollections();
	testGetAllDocuments();
	testGetDocsWithQuery();
	testInsertDocument();
	testDeleteDocById();
	testUpdateDocById();
}
