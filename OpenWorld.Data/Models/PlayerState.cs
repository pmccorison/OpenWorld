using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Data.Models
{
    public class PlayerState
    {
        public string PlayerId { get; set; }

        //SignalR connection id
        public string ConnectionId { get; set; }

        public float LocX { get; set; }

        public float LocY { get; set; }

        public int LocZ { get; set; }

        public List<PlayerAction> PlayerActions { get; set; }
    }
}
