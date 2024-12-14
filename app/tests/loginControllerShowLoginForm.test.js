import {
    assertSpyCall,
    spy,
} from "https://deno.land/std@0.223.0/testing/mock.ts";
import { showLoginForm } from "../routes/controllers/loginController.js";

Deno.test("showLoginForm should call render with 'login.eta'", () => {
    // Mock `render` function
    const mockRender = spy();

    // Mock context object
    const context = {
        render: mockRender,
    };

    // Call the function with the mock context
    showLoginForm(context);

    // Verify that `render` was called once with the correct template
    assertSpyCall(mockRender, 0, {
        args: ["login.eta"],
    });
});
