using System;

namespace ComX_0._0._2.Views.Account.Models.DtoModels {
    public class MessageDto {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Date { get; set; }
        public string Author { get; set; }
        public string AuthorId { get; set; }
        public bool IsReceived { get; set; }
        public bool IsNewThread { get; set; }
        public Guid Thread { get; set; }
    }
}