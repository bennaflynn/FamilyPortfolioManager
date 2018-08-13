using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Services
{
    public static class HashString
    {
        public static string HashThat(string str, string salt)
        {
            str = str + salt;

            HashAlgorithm algo = SHA256.Create();

            byte[] byteArray = algo.ComputeHash(Encoding.UTF8.GetBytes(str));

            StringBuilder sb = new StringBuilder();

            foreach(byte b in byteArray)
            {
                sb.Append(b.ToString("X2"));
            }
            return sb.ToString();
        }
    }
}
