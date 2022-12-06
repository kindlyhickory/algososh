import {DELAY_MIDDLE, TEST_URL} from "../../src/constants/constants";
import {CIRCLE_CLASS_SELECTOR} from "../../src/constants/testing-constants";

describe("string page display correct", () => {
    before(() => {
        cy.visit(`${TEST_URL}/recursion`);
    });

    it('button disabled if input empty', () => {
        cy.get("input").should("be.empty");
        cy.get("button").should("be.disabled");
    });

    it('string reversed correctly', () => {
        const i = 5;

        const startString = '12345';
        const stepOne = [
            "rgb(210, 82, 225)",
            "rgb(0, 50, 255)",
            "rgb(0, 50, 255)",
            "rgb(0, 50, 255)",
            "rgb(210, 82, 225)",
        ];

        const stepTwoString = "52341";
        const stepTwo = [
            "rgb(127, 224, 81)",
            "rgb(210, 82, 225)",
            "rgb(0, 50, 255)",
            "rgb(210, 82, 225)",
            "rgb(127, 224, 81)",
        ];

        const endString = "54321";
        const stepThree = [
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
        ];
        cy.get("input").type(startString);
        cy.get("button").should("not.be.disabled");
        cy.get("button[type='submit']").click();

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list).should("have.length", i);
            cy.get($el).contains(startString[index]);
            cy.get($el).should("have.css", "border-color", stepOne[index]);
        });

        cy.wait(DELAY_MIDDLE);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list).should("have.length", i);
            cy.get($el).contains(stepTwoString[index]);
            cy.get($el).should(
                "have.css", "border-color", stepTwo[index]
            );
        });

        cy.wait(DELAY_MIDDLE);

        cy.get(CIRCLE_CLASS_SELECTOR).each(($el, index, $list) => {
            cy.get($list).should("have.length", i);
            cy.get($el).contains(endString[index]);
            cy.get($el).should("have.css", "border-color", stepThree[index]);
        });
    })
});