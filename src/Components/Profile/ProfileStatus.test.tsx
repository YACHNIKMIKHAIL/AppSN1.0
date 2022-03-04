import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("Status from props should be in the state", () => {
        const component = create(<ProfileStatus status='blabla' updateStatus={() => {
        }}/>);
        const instance = component.getInstance()
        // @ts-ignore
        expect(instance.state.status).toBe('blabla')
    });

    test("After creation span with status should be displayed", () => {
        const component = create(<ProfileStatus status='blabla' updateStatus={() => {
        }}/>);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        const span = root.findByType("span");
        expect(span).not.toBeNull()
    });

    test("After creation span with status should be correct", () => {
        const component = create(<ProfileStatus status='blabla' updateStatus={() => {
        }}/>);
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        const span = root.findByType("span");
        expect(span.children[1]).toBe('blabla')


        // const testInstance = component.root;
        // expect(testInstance.findByType("span")).toBe(1);
    });
});