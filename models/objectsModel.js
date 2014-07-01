module.exports = {
    connection : false,

    init : function (connection) 
    {
        this.connect = connection;
    },

    refresh : function (id, ip, successCallback, errorCallback) 
    {
        this.connection.query("UPDATE objects SET ip = '"+ ip +"' WHERE id = '"+ id +"'", function (error) {
            if (error) {
                errorCallback("Impossible de modifie l'IP");
                return false;
            }

            successCallback();
        })
    }
}