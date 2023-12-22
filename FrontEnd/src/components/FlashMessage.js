function FlashMessage({message}){
    const flashMessageStyle = {
        backgroundColor: '#4caf50', // Green background color
        color: 'white',             // White text color
        padding: '15px',            // Padding around the content
        marginBottom: '20px',       // Bottom margin to separate from other elements
        borderRadius: '4px',        // Rounded corners
        textAlign: 'center',        // Center the text
        fontFamily: "'Gill Sans', sans-serif",
      };
    return(
        <div style={flashMessageStyle}>
            {message}
        </div>
    );
}
export default FlashMessage;