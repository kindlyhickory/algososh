import {DELAY_LOW, TEST_URL} from "../../src/constants/constants";
import {
    ADD_BUTTON_SELECTOR,
    CIRCLE_CLASS_SELECTOR,
    CIRCLE_HEAD_CLASS_SELECTOR,
    CIRCLE_INDEX_CLASS_SELECTOR,
    CIRCLE_MAIN_CLASS_SELECTOR,
    REMOVE_BUTTON_SELECTOR,
    RESET_BUTTON_SELECTOR
} from "../../src/constants/testing-constants";

describe("stack page display correctly", function () {
    before(() => {
        cy.visit(`${TEST_URL}/stack`);
    });
    it("button disabled if input is empty", function () {
        cy.get("input").should("be.empty");
        cy.get(ADD_BUTTON_SELECTOR).should("be.disabled");
    });
    const modifiedColor = "rgb(210, 82, 225)";
    const defaultColor = "rgb(0, 50, 255)";
    const firstElement = 'a';
    const secondElement = 'b';
    const thirdElement = 'c';

    it("should elements add to stack correctly", () => {
        cy.get("input").type(firstElement);
        cy.get(ADD_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters).to.have.length(1);
            expect($letters.eq(0)).to.contain(firstElement);
            cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("top");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get("input").should("be.empty");
        cy.get("input").type(secondElement);
        cy.get(ADD_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters).to.have.length(2);
            expect($letters.eq(0)).to.contain(firstElement);
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("top");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get("input").should("be.empty");
        cy.get("input").type(thirdElement);
        cy.get(ADD_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters).to.have.length(3);
            expect($letters.eq(0)).to.contain(firstElement);
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            expect($letters.eq(1)).to.contain(secondElement);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
            cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
            cy.wait(DELAY_LOW);
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("");
            expect($head.eq(2)).to.contain("top");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });
    });

    it("should elements delete from the stack correctly", () => {
        cy.get(REMOVE_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(2)).to.contain(thirdElement);
            cy.get($letters.eq(2)).should("have.css", "border-color", modifiedColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.wait(DELAY_LOW);
            expect($list).to.have.length(2);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters).to.have.length(2);
            expect($letters.eq(0)).to.contain(firstElement);
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
            expect($letters.eq(1)).to.contain(secondElement);
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("top");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get(REMOVE_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(1)).to.contain(secondElement);
            cy.get($letters.eq(1)).should("have.css", "border-color", modifiedColor);
        });

        cy.wait(DELAY_LOW);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.wait(DELAY_LOW);
            expect($list).to.have.length(1);
        });

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters).to.have.length(1);
            expect($letters.eq(0)).to.contain(firstElement);
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
        });

        cy.get(CIRCLE_HEAD_CLASS_SELECTOR).within(($head) => {
            expect($head.eq(0)).to.contain("top");
        });

        cy.get(CIRCLE_INDEX_CLASS_SELECTOR).each(($el, index, $list) => {
            expect($el).to.contain(index);
        });

        cy.get(REMOVE_BUTTON_SELECTOR).click();

        cy.get(CIRCLE_CLASS_SELECTOR).within(($letters) => {
            expect($letters.eq(0)).to.contain(firstElement);
            cy.get($letters.eq(0)).should("have.css", "border-color", modifiedColor);
        });

        cy.wait(DELAY_LOW);
        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 0);
    });

    it("should reset button works correctly", () => {
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
        cy.get(CIRCLE_MAIN_CLASS_SELECTOR).should("have.length", 0);
    });
});