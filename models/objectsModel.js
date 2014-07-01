module.exports = {
    connection : false,

    init : function (connection) 
    {
        this.connection = connection;
    },

    refresh : function (id, ip, successCallback, errorCallback) 
    {
        this.connection.query("UPDATE objects SET ip = '"+ ip +"' WHERE id = '"+ id +"' ", function (error) {
            if (error) {
                errorCallback("Impossible de modifie l'IP");
                return false;
            }

            successCallback();
        })
    },

    get : function (id, successCallback, errorCallback)
    {
        this.connection.query("SELECT * FROM objects LEFT JOIN ports ON objects.type = ports.type WHERE objects.id = '"+ id +"' ", function (error, rows)
        {
            if (error) {
                errorCallback("Impossible de recuperer les informations de cet appareil");
                return false;
            }
            
            successCallback(rows);
        });
    }
}