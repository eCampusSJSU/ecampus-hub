export default (state = {
    notificationStyle: {
        NotificationItem: { // Override the notification item
            DefaultStyle: { // Applied to every notification, regardless of the notification level
                margin: '10px 5px 2px 1px'
            },

            success: { // Applied only to the success notification item
                borderTop: '0px solid #42A084',
                backgroundColor: '#8EF3C5',
                color: '#42A084',
            },
            error: {
                borderTop: '0px solid #B33C12',
                backgroundColor: '#FF8F5E',
                color: '#B33C12',
            },
            warning: {
                borderTop: '0px solid #BB992F',
                backgroundColor: '#FFE28C',
                color: '#BB992F',
            },
            info: {
                borderTop: '0px solid #3091B2',
                backgroundColor: '#7CE4FE',
                color: '#3091B2',
            },
        },
        Dismiss: {
            DefaultStyle: { // Applied to every notification, regardless of the notification level
                marginRight: '10px'
            },
            success: { // Applied only to the success notification item
                backgroundColor: '#8EF3C5',
                color: '#42A084',
            },
            error: {
                backgroundColor: '#FF8F5E',
                color: '#B33C12',
            },
            warning: {
                backgroundColor: '#FFE28C',
                color: '#BB992F',
            },
            info: {
                backgroundColor: '#7CE4FE',
                color: '#3091B2',
            }
        },
        Title: {

            success: {
                color: '#42A084'
            },

            error: {
                color: '#B33C12'
            },

            warning: {
                color: '#BB992F'
            },

            info: {
                color: '#3091B2'
            }

        },
    }
}) => {
    return state;
};