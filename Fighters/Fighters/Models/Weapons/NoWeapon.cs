using Fighters.Weapons;

namespace Fighters
{
    public class NoWeapon : IWeapon
    {
        public int Damage { get; } = 1;
    }
}