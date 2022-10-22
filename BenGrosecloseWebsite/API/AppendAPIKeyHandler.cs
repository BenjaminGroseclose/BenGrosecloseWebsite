namespace BenGrosecloseWebsite.API
{
    public class AppendAPIKeyHandler : DelegatingHandler
    {
        private string Key { get; set; }

        public AppendAPIKeyHandler(string key)
        {
            this.Key = key;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.RequestUri != null)
            {
                request.RequestUri = new Uri(request.RequestUri, $"?key={this.Key}");
            }

            return await base.SendAsync(request, cancellationToken);
        }
    }
}