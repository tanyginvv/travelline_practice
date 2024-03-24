﻿namespace Fighters.Races
{
    public class Human : IRace
    {
        public string Name { get; } = "Человек";
        public int Damage { get; } = 11;

        public int Health { get; } = 100;

        public int Armor { get; } = 10;
        public int Speed { get; } = 30;
    }
}