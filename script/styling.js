const buttons_panel = document.querySelector('.buttons');
const buttons = buttons_panel.children;
const num_buttons = buttons.length;
const buttons_on_last_row = buttons.length % 4;

console.log(buttons);

const button_span = (last_row_element) => {
    let span = {1: 4, 2: 3, 3: 2, 0: 1};
    return span[last_row_element];
}

buttons[num_buttons - 1].style.gridColumnEnd = `span ${button_span(buttons_on_last_row)}`;
