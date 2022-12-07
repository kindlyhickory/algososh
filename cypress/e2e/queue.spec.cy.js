import {DELAY_LOW, TEST_URL} from "../../src/constants/constants";
import {
    ADD_BUTTON_SELECTOR,
    CIRCLE_CLASS_SELECTOR,
    CIRCLE_HEAD_CLASS_SELECTOR,
    CIRCLE_INDEX_CLASS_SELECTOR,
    CIRCLE_TAIL_CLASS_SELECTOR,
    REMOVE_BUTTON_SELECTOR,
    RESET_BUTTON_SELECTOR
} from "../../src/constants/testing-constants";

describe("queue page displays correctly", function () {
    before( () => {
        cy.visit(`${TEST_URL}/queue`);
    });

    it("should button disabled if input is empty", function () {
        cy.get("input").should("be.empty");
        cy.get(ADD_BUTTON_SELECTOR).should("be.disabled");
    });

    const firstElement = 'a';
    const secondElement = 'b';
    const thirdElement = 'c';
    const modifiedColor = "rgb(210, 82, 225)";
    const defaultColor = "rgb(0, 50, 255)";

    it("elements add to the queue correctly", function () {
        cy.get(CIRCLE_CLASS_SELECTOR).each(($list) => {
            cy.get($list).should("have.css", "border-color", defaultColor);
        });

        cy.get("input").should("be.empty");
        cy.get("input").type(firstElement);
        cy.get(ADD_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("head");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            expect($tail.eq(0)).to.contain("tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get("input").should("be.empty");
        cy.get("input").type(secondElement);
        cy.get(ADD_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
            expect($letters.eq(1)).to.contain(secondElement);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("head");
            expect($head.eq(1)).to.contain("");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            expect($tail.eq(0)).to.contain("");
            expect($tail.eq(1)).to.contain("tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get("input").should("be.empty");
        cy.get("input").type(thirdElement);
        cy.get(ADD_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
            expect($letters.eq(1)).to.contain(secondElement);
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("head");
            expect($head.eq(1)).to.contain("");
            expect($head.eq(2)).to.contain("");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            expect($tail.eq(0)).to.contain("");
            expect($tail.eq(1)).to.contain("");
            expect($tail.eq(2)).to.contain("tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index) => {
            expect($el).to.contain(index);
        });
    });

    it("elements delete from the queue correctly", function () {
        cy.get(REMOVE_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain("");
            expect($letters.eq(1)).to.contain(secondElement);
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("head");
            expect($head.eq(2)).to.contain("");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            expect($tail.eq(0)).to.contain("");
            expect($tail.eq(1)).to.contain("");
            expect($tail.eq(2)).to.contain("tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(REMOVE_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain("");
            expect($letters.eq(1)).to.contain("");
            expect($letters.eq(2)).to.contain(thirdElement);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("");
            expect($head.eq(2)).to.contain("head");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            expect($tail.eq(0)).to.contain("");
            expect($tail.eq(1)).to.contain("");
            expect($tail.eq(2)).to.contain("tail");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(REMOVE_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain("");
            expect($letters.eq(1)).to.contain("");
            expect($letters.eq(2)).to.contain("");
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("");
            expect($head.eq(2)).to.contain("");
        });

        cy.get(CIRCLE_TAIL_CLASS_SELECTOR).within(($tail) => {
            expect($tail.eq(0)).to.contain("");
            expect($tail.eq(1)).to.contain("");
            expect($tail.eq(2)).to.contain("");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index) => {
            expect($el).to.contain(index);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).each(($list) => {
            expect($list).to.contain("");
        });
    });

    it("reset button works correctly", function () {
        cy.get("input").should("be.empty");
        cy.get("input").type(firstElement);
        cy.get(ADD_BUTTON_SELECTOR).click();
        cy.wait(DELAY_LOW);
        cy.get("input").should("be.empty");
        cy.get("input").type(secondElement);
        cy.get(ADD_BUTTON_SELECTOR).click();
        cy.wait(DELAY_LOW);
        cy.get("input").should("be.empty");
        cy.get("input").type(thirdElement);
        cy.get(ADD_BUTTON_SELECTOR).click();
        cy.wait(DELAY_LOW);

        cy.get(RESET_BUTTON_SELECTOR).click();
        cy.get(CIRCLE_CLASS_SELECTOR).each(($list) => {
            expect($list).to.contain("");
        });
    });
});
