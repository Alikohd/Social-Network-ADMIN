function createFriendElement(friend) {
    const listItem = $('<li>').addClass('list-group-item');
    const link = $('<a>').attr('href', `user_page.html?id=${friend.id}`).text(friend.name);
    listItem.append(link);
    return listItem;
}

$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $.get(`https://localhost:${port}/users/${id}`)
        .done(function (user) {
            if (!user) {
                console.error('Failed to fetch user data');
                return;
            }

            $('h1').text(`Список друзей пользователя ${user.name}`);

            const friendRequests = user.friends.map(friendId => {
                return $.get(`https://localhost:${port}/users/${friendId}`);
            });

            Promise.all(friendRequests)
                .then(function (friends) {
                    const friendsList = $('<ul>').addClass('list-group');

                    friends.forEach(friend => {
                        friendsList.append(createFriendElement(friend));
                    });

                    $('.container').append(friendsList);
                })
                .catch(function (error) {
                    console.error('Error fetching friend data', error);
                });
        })
        .fail(function (error) {
            console.error('Error fetching user data', error);
        });
});
