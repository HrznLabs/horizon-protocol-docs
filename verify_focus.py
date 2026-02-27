from playwright.sync_api import sync_playwright

def verify_focus():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            # Navigate to local server
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000")

            # Wait for content to load
            page.wait_for_load_state("networkidle")

            print("Starting focus navigation...")

            # Focus on the body first to ensure we start from the top
            page.locator("body").focus()

            # Press Tab 5 times to navigate through the initial focusable elements
            # Expected sequence: Skip to content -> Logo -> Docs -> Blog -> etc.
            for i in range(1, 6):
                page.keyboard.press("Tab")
                page.wait_for_timeout(500) # Wait for focus transition

                # Get the currently focused element
                focused = page.evaluate("document.activeElement.outerHTML")
                print(f"Step {i}: Focused element: {focused[:100]}...")

                # Take a screenshot
                screenshot_path = f"focus_new_{i}.png"
                page.screenshot(path=screenshot_path)
                print(f"Saved screenshot: {screenshot_path}")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="error_focus.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_focus()
