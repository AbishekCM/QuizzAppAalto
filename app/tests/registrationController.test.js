import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts";
import {
    assertSpyCall,
    spy,
} from "https://deno.land/std@0.223.0/testing/mock.ts";
import {
    getData,
    showRegistrationForm,
} from "../routes/controllers/registrationController.js";

Deno.test("getData should return email and password from request body", async () => {
    // Mock request with form data
    const mockRequest = {
        body: () => ({
            value: new Map([
                ["email", "test@example.com"],
                ["password", "mypassword123"],
            ]),
        }),
    };

    // Call the function with the mocked request
    const result = await getData(mockRequest);

    // Expected result
    const expected = {
        email: "test@example.com",
        password: "mypassword123",
    };

    // Assert the result matches the expected output
    assertEquals(result, expected);
});

Deno.test("showRegistrationForm should call render with 'registration.eta' and an empty email", () => {
    // Mock the render function
    const mockRender = spy();

    // Mock context object
    const context = {
        render: mockRender,
    };

    // Call the function with the mocked context
    showRegistrationForm(context);

    // Assert that render was called once with the correct arguments
    assertSpyCall(mockRender, 0, {
        args: ["registration.eta", { email: "" }],
    });
});
