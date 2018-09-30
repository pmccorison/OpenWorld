using OpenWorld.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Services.Interfaces.StateManagers
{
    public interface IPlayerStateManager
    {
        /// <summary>
        /// Update a players state from the client
        /// </summary>
        /// <param name="playerState"></param>
        void UpdatePlayer(PlayerState playerState);

        /// <summary>
        /// Connect a player on a particular connection id
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="playerPin"></param>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        PlayerState ConnectPlayer(string playerId, string playerPin, string connectionId);

        /// <summary>
        /// Disconnect a player connected to the server
        /// </summary>
        /// <param name="playerId"></param>
        /// <param name="connectionId"></param>
        void DisconnectPlayer(string connectionId);
    }
}
