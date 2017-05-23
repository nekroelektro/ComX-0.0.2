using System;

namespace ComX_0._0._2.Views.Account.Models {
    public class UserMessage {
        public Guid Id { get; set; }
        public Guid UserFrom { get; set; }
        public Guid UserTo { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public Guid Thread { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsReceived { get; set; }
        public bool IsSystem { get; set; }
    }
}