// An HTTP trigger Azure Function that returns a SAS token for Azure Storage for the specified container.
// You can also optionally specify a particular blob name and access permissions.
// To learn more, see https://github.com/Azure-Samples/functions-dotnet-sas-token/blob/master/README.md

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};