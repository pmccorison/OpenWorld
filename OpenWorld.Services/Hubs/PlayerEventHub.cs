using Microsoft.AspNetCore.SignalR;
using OpenWorld.Data.Models;
using OpenWorld.Services.Interfaces.StateManagers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OpenWorld.Services.Hubs
{
    public class PlayerEventHub : Hub
    {
        private readonly IPlayerStateManager m_PlayerStateManager;

        public PlayerEventHub(IPlayerStateManager playerStateManager)
        {
            m_PlayerStateManager = playerStateManager;
        }

        public void ConnectPlayer(string playerId, string playerPin)
        {
            try
            {
                var newConnection = m_PlayerStateManager.ConnectPlayer(playerId, playerPin, Context.ConnectionId);

                Clients.Caller.SendAsync("ConnectionResult", newConnection);
            }
            catch
            {
                Clients.Caller.SendAsync("ConnectionFailed");
            }
        }

        public void UpdateClientEvents(PlayerState state)
        {
            state.ConnectionId = Context.ConnectionId;

            m_PlayerStateManager.UpdatePlayer(state);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            m_PlayerStateManager.DisconnectPlayer(Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }
    }
}
