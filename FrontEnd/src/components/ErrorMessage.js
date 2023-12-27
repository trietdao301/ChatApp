function ErrorMessage({message}){
    const ErrorMessageStyle = {
        backgroundColor: '#e74c3c',   // Red background color for errors
        color: 'white',               // White text color
        padding: '15px',              // Padding around the content
        marginBottom: '20px',         // Bottom margin to separate from other elements
        borderRadius: '4px',          // Rounded corners
        textAlign: 'center',          // Center the text
        fontFamily: "'Gill Sans', sans-serif",
      };
    return(
        <div style={ErrorMessageStyle}>
            {message}
        </div>
    );
}
export default ErrorMessage;