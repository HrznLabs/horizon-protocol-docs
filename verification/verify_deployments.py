from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to homepage
        print("Navigating to homepage...")
        page.goto("http://localhost:3000/")

        # Verify title
        expect(page).to_have_title("Documentation | Horizon Protocol")

        # Scroll to Deployments section
        print("Scrolling to Deployments section...")
        deployments_heading = page.get_by_role("heading", name="Deployed on Base Sepolia")
        deployments_heading.scroll_into_view_if_needed()
        expect(deployments_heading).to_be_visible()

        # Verify contract addresses (shortened)
        # 0xee9234954b134c39c17a75482da78e46b16f466c -> 0xee92...466c
        print("Verifying MissionFactory address...")
        mission_factory_address = page.locator("text=0xee92...466c")
        expect(mission_factory_address).to_be_visible()

        # Verify PaymentRouter address
        # 0x94fb7908257ec36f701d2605b51eefed4326ddf5 -> 0x94fb...ddf5
        print("Verifying PaymentRouter address...")
        payment_router_address = page.locator("text=0x94fb...ddf5")
        expect(payment_router_address).to_be_visible()

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/deployments.png", full_page=False)
        print("Screenshot saved to verification/deployments.png")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
        raise e
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
