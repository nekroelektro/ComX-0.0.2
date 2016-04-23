﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ComX_0._0._2.Models {
    public class Users {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        [DataType(DataType.EmailAddress)]
        public string UserEmail { get; set; }

        public virtual ICollection<UserRoles> UserRoles { get; set; } 
    }
}