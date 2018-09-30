using Microsoft.AspNetCore.SignalR;
using OpenWorld.Data.Exceptions;
using OpenWorld.Data.Models;
using OpenWorld.Services.Hubs;
using OpenWorld.Services.Interfaces.StateManagers;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace OpenWorld.Services.Services.StateManagers
{
    public class PlayerStateManager : IPlayerStateManager
    {
        private readonly IHubContext<PlayerEventHub> m_PlayerEventHub;
        private Timer broadcastTimer;

        private ConcurrentDictionary<string, string> _ConnectionIdLookup = new ConcurrentDictionary<string, string>();
        private ConcurrentDictionary<string, PlayerState> _ConnectedPlayers = new ConcurrentDictionary<string, PlayerState>();

        public PlayerStateManager(IHubContext<PlayerEventHub> playerHub)
        {
            m_PlayerEventHub = playerHub;
            broadcastTimer = new Timer(new TimerCallback(BroadcastMethod), null, 3000, 100);
        }

        public PlayerState ConnectPlayer(string playerId, string playerPin, string connectionId)
        {
            _ConnectedPlayers.TryGetValue(playerId, out var existingPlayer);

            if(existingPlayer != null)
            {
                throw new PlayerConnectionException("Player is already connected", ConnectionErrorType.PlayerAlreadyConnected);
            }

            //ToDo: eventually pull our player record from the DB and ensure that their pin matches.

            PlayerState state = new PlayerState();
            state.PlayerId = playerId;
            state.ConnectionId = connectionId;
            state.LocX = 0;
            state.LocY = 0;
            state.LocZ = 0;

            if(!_ConnectedPlayers.TryAdd(connectionId, state) || !_ConnectionIdLookup.TryAdd(playerId, connectionId))
            {
                throw new PlayerConnectionException("Something went wrong registering the user", ConnectionErrorType.RegistrationError);
            }

            return state;
        }

        public void DisconnectPlayer(string connectionId)
        {
            if(_ConnectionIdLookup.TryGetValue(connectionId, out var playerId))
            {
                if (_ConnectedPlayers.ContainsKey(playerId))
                {
                    _ConnectedPlayers.TryRemove(playerId, out var connection);
                }
            }            
        }

        public void UpdatePlayer(PlayerState playerState)
        {
            //throw new NotImplementedException();
        }

        private async void BroadcastMethod(object x)
        {
            try
            {
                await m_PlayerEventHub.Clients.All.SendAsync("RecieveClientData", _ConnectedPlayers);
            }
            catch
            {
                //eventually silently log the error herse
            }
        }
    }
}
