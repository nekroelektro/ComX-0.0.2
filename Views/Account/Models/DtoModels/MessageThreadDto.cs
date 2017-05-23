using System;
using System.Collections.Generic;

namespace ComX_0._0._2.Views.Account.Models.DtoModels {
    public class MessageThreadDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public List<MessageDto> Messages { get; set; }
        public bool IsAllRead { get; set; }
        public Guid UserWithId { get; set; }
    }
}