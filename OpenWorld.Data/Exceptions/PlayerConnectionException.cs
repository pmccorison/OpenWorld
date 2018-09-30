using System;
using System.Collections.Generic;
using System.Text;

namespace OpenWorld.Data.Exceptions
{
    public class PlayerConnectionException : Exception
    {
        public ConnectionErrorType _ErrorType;

        public PlayerConnectionException(string message, ConnectionErrorType errorType) : base(message)
        {
            _ErrorType = errorType;
        }
    }

    public enum ConnectionErrorType
    {
        None,
        PlayerAlreadyConnected,
        RegistrationError
    }
}
