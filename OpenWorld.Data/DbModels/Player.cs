using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OpenWorld.Data.DbModels
{
    public class Player
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PrimaryColor { get; set; }

        public string SecondaryColor { get; set; }

        public float LocX { get; set; }

        public float LocY { get; set; }

        public int LocZ { get; set; } //depth to the screen will only be in full numbers
    }
}
