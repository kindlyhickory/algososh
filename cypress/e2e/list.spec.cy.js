import {DELAY_LOW, TEST_URL} from "../../src/constants/constants";
import {
    ADD_TO_HEAD_BUTTON_SELECTOR,
    ADD_TO_INDEX_BUTTON_SELECTOR,
    ADD_TO_TAIL_BUTTON_SELECTOR,
    ARROW_SELECTOR,
    BOTTOM_CIRCLE_SELECTOR,
    CIRCLE_CLASS_SELECTOR,
    CIRCLE_HEAD_CLASS_SELECTOR,
    CIRCLE_INDEX_CLASS_SELECTOR, CIRCLE_LETTER_CLASS_SELECTOR,
    CIRCLE_MAIN_CLASS_SELECTOR,
    CIRCLE_TAIL_CLASS_SELECTOR,
    INDEX_VALUE_SELECTOR,
    INPUT_VALUE_SELECTOR,
    REMOVE_FROM_HEAD_BUTTON_SELECTOR,
    REMOVE_FROM_INDEX_BUTTON_SELECTOR,
    REMOVE_FROM_TAIL_BUTTON_SELECTOR,
    SMALL_CIRCLE_SELECTOR,
    TOP_CIRCLE_SELECTOR
} from "../../src/constants/testing-constants";

describe("list page displays correctly", function () {
    before(function () {
        cy.visit(`${TEST_URL}/list`);
    });

    const defaultColor = "rgb(0, 50, 255)";
    const modifiedColor = "rgb(210, 82, 225)";
    const changingColor = "rgb(127, 224, 81)";
    const value = 1;
    const index = 2;

    it("add button and delete by index button disabled if input is empty", function () {
        cy.get("input").should("be.empty");
        cy.get(ADD_TO_HEAD_BUTTON_SELECTOR).should("be.disabled");
        cy.get(ADD_TO_TAIL_BUTTON_SELECTOR).should("be.disabled");
        cy.get(ADD_TO_INDEX_BUTTON_SELECTOR).should("be.disabled");
        cy.get(REMOVE_FROM_INDEX_BUTTON_SELECTOR).should("be.disabled");
    });

    it("should default list renders", function () {
        cy.get(".circles-list").find("li");
        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 4);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_LETTER_CLASS_SELECTOR).each(($letter) => {
            [][0] = $letter.text();
            [][1] = $letter.text();
            [][2] = $letter.text();
            [][3] = $letter.text();
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });

        cy.get(ARROW_SELECTOR).should("have.length", 3);
    });

    it("add to head works correctly", function () {
        cy.get(INPUT_VALUE_SELECTOR).should("be.empty");
        cy.get(INPUT_VALUE_SELECTOR).type(value);

        cy.get(ADD_TO_HEAD_BUTTON_SELECTOR).click();
        cy.get(TOP_CIRCLE_SELECTOR);

        cy.get(TOP_CIRCLE_SELECTOR).contains(value);
        cy.get(TOP_CIRCLE_SELECTOR)
            .find(SMALL_CIRCLE_SELECTOR)
            .should("have.css", "border-color", modifiedColor);

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 5);

        cy.get(ARROW_SELECTOR).should("have.length", 4);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", changingColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
            cy.get($head.eq(4)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "");
            cy.get($tail.eq(4)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });
    });

    it("should add to tail works correctly", function () {
        cy.get(INPUT_VALUE_SELECTOR).should("be.empty");
        cy.get(INPUT_VALUE_SELECTOR).type(value);

        cy.get(ADD_TO_TAIL_BUTTON_SELECTOR).click();

        cy.get(TOP_CIRCLE_SELECTOR);

        cy.get(TOP_CIRCLE_SELECTOR).contains(value);
        cy.get(TOP_CIRCLE_SELECTOR)
            .find(SMALL_CIRCLE_SELECTOR)
            .should("have.css", "border-color", modifiedColor);

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 6);

        cy.get(ARROW_SELECTOR).should("have.length", 5);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(5)).should("have.css", "border-color", changingColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
            cy.get($head.eq(4)).should("contain", "");
            cy.get($head.eq(5)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "");
            cy.get($tail.eq(4)).should("contain", "");
            cy.get($tail.eq(5)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });
    });

    it("should delete from the head correctly", function () {
        cy.get(REMOVE_FROM_HEAD_BUTTON_SELECTOR).click();

        cy.get(BOTTOM_CIRCLE_SELECTOR);

        cy.get(BOTTOM_CIRCLE_SELECTOR).contains(value);
        cy.get(BOTTOM_CIRCLE_SELECTOR)
            .find(SMALL_CIRCLE_SELECTOR)
            .should("have.css", "border-color", modifiedColor);

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 5);

        cy.get(ARROW_SELECTOR).should("have.length", 4);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
            cy.get($head.eq(4)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "");
            cy.get($tail.eq(4)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });
    });

    it("should delete from the tail correctly", function () {
        cy.get(REMOVE_FROM_TAIL_BUTTON_SELECTOR).click();

        cy.get(BOTTOM_CIRCLE_SELECTOR);

        cy.get(BOTTOM_CIRCLE_SELECTOR).contains(value);
        cy.get(BOTTOM_CIRCLE_SELECTOR)
            .find(SMALL_CIRCLE_SELECTOR)
            .should("have.css", "border-color", modifiedColor);

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 4);

        cy.get(ARROW_SELECTOR).should("have.length", 3);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });
    });

    it("should add by index correctly", function () {
        cy.get(INPUT_VALUE_SELECTOR).should("be.empty");
        cy.get(INPUT_VALUE_SELECTOR).type(value);

        cy.get(INDEX_VALUE_SELECTOR).should("be.empty");
        cy.get(INDEX_VALUE_SELECTOR).type(index);

        cy.get(ADD_TO_INDEX_BUTTON_SELECTOR).click();

        cy.get(TOP_CIRCLE_SELECTOR);

        cy.get(TOP_CIRCLE_SELECTOR).contains(value);
        cy.get(TOP_CIRCLE_SELECTOR)
            .find(SMALL_CIRCLE_SELECTOR)
            .should("have.css", "border-color", modifiedColor);

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
        });

        cy.wait(DELAY_LOW);
        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
        });

        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 5);

        cy.get(ARROW_SELECTOR).should("have.length", 4);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", changingColor);
            expect($list.eq(2)).to.contain(value);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
            cy.get($head.eq(4)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "");
            cy.get($tail.eq(4)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });
    });

    it("should delete by index correctly", function () {
        cy.get(INDEX_VALUE_SELECTOR).should("be.empty");
        cy.get(INDEX_VALUE_SELECTOR).type(index);
        cy.get(REMOVE_FROM_INDEX_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(2)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(1)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(2)).should("have.css", "border-color", modifiedColor);
            cy.get($list.eq(3)).should("have.css", "border-color", defaultColor);
            cy.get($list.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.get(BOTTOM_CIRCLE_SELECTOR);

        cy.get(BOTTOM_CIRCLE_SELECTOR).contains(value);
        cy.get(BOTTOM_CIRCLE_SELECTOR)
            .find(SMALL_CIRCLE_SELECTOR)
            .should("have.css", "border-color", modifiedColor);

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 4);

        cy.get(ARROW_SELECTOR).should("have.length", 3);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el) => {
            cy.get($el).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            cy.get($head.eq(0)).should("contain", "head");
            cy.get($head.eq(1)).should("contain", "");
            cy.get($head.eq(2)).should("contain", "");
            cy.get($head.eq(3)).should("contain", "");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            cy.get($tail.eq(0)).should("contain", "");
            cy.get($tail.eq(1)).should("contain", "");
            cy.get($tail.eq(2)).should("contain", "");
            cy.get($tail.eq(3)).should("contain", "tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($el).should("contain", index);
        });
    });
});
