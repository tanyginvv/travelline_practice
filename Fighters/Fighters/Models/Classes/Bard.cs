using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fighters.Models.Classes
{
    internal class Bard : IClass 
    {
        public int Damage { get; } = 10;
        public int Health { get; } = 30;
    }
}
