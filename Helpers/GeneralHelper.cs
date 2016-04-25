using System;

namespace ComX_0._0._2.Helpers {
    public class GeneralHelper {
        public string GenerateRandomNumber() {
            var random = new Random();
            var randomNumber = random.Next(100000, 99999999);
            return randomNumber.ToString();
        }
    }
}