namespace api
{
    // Konverterar url för databasen hos ElephantSQL till en connectionString för Npgsql
    // https://www.elephantsql.com/docs/dotnet.html
    public static class ElephantSql
    {
        // Namnet på environment variable eller Visual Studio User Secret som
        // innehåller url/connectionstring till databasen hos ElephantSQL
        public const string EnvironmentVariable = "ElephantSql";
        public static string ConvertToConnectionString(string uriString)
        {
            var uri = new Uri(uriString);
            var database = uri.AbsolutePath.Trim('/');
            var user = uri.UserInfo.Split(':')[0];
            var password = uri.UserInfo.Split(':')[1];
            var port = uri.Port > 0 ? uri.Port : 5432;
            var postgreSql = string.Format("Server={0};Database={1};User Id={2};Password={3};Port={4}",
                uri.Host, database, user, password, port);
            return postgreSql;
        }
    }
}
