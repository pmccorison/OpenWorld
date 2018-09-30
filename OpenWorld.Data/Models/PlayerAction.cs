using OpenWorld.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Data.Models
{
    public class PlayerAction
    {
        public ActionType ActionType { get; set; }

        public long ActionStartTime { get; set; }

        public long ActionEndTime { get; set; }
    }
}
