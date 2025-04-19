import { Button } from "../ui/button"
import Script from "next/script"
import { createClient } from "@/utils/supabase/client";


export default function ThirdPartyAuth() {
    // Create Supabase client
    const supabase = createClient()
    
    return (
        <>
            <Script id="handleSignInWithGoogle">{`
            // Function to generate and hash a nonce
            function generateNonce() {
                const rawNonce = Array.from(crypto.getRandomValues(new Uint8Array(32)))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
                
                // Store the raw nonce in sessionStorage to use when signing in
                sessionStorage.setItem('supabaseAuthNonce', rawNonce);
                
                // Return the raw nonce (Google will hash it internally)
                return rawNonce;
            }
            
            // Make handler function available globally
            window.handleSignInWithGoogle = async (response) => {
                const supabase = createClientComponentClient();
                const nonce = sessionStorage.getItem('supabaseAuthNonce');
                
                const { data, error } = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: response.credential,
                    nonce: nonce,
                });
                
                if (error) {
                    console.error('Error signing in:', error);
                } else {
                    console.log('Signed in successfully:', data);
                    window.location.href = '/journals'; // Redirect after successful sign-in
                }
            };
            
            // Generate nonce when the script loads
            const nonce = generateNonce();
            `}</Script>
            <Script src="https://accounts.google.com/gsi/client" async></Script>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                />
                </svg>
                Continue with Facebook
            </Button>
            <div className="w-full">
                <div id="g_id_onload"
                    style={{ colorScheme: 'light'}}
                    data-client_id="51755943235-j3odssuhl2naght7aun5dm0sdq3u9k5m.apps.googleusercontent.com"
                    data-context="signup"
                    data-ux_mode="popup"
                    data-callback="handleSignInWithGoogle"
                    data-nonce=""
                    data-auto_select="true"
                    data-itp_support="true">
                </div>

                <div className="g_id_signin"
                    style={{ colorScheme: 'light'}}
                    data-type="standard"
                    data-shape="pill"
                    data-theme="filled_blue"
                    data-text="continue_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div>
            </div>
            </div>
        </>
    )
}