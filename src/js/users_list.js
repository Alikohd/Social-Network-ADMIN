$(document).ready(() => {
    $.get(`https://localhost:${port}/users`, (users) => {
        const usersBlock = $('.users_list');
        const userModuleLink = $('<a>')
            .attr('href', 'http://localhost:4200/')
            .text("Модуль пользователя");
        usersBlock.append(userModuleLink);

        users.forEach(user => {
            usersBlock.append(create_user_elem(user));
        });

    }).fail((xhr, status, error) => {
        console.error(`Error: ${status} - ${error}`);
    });
});
