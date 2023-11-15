import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {z} from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation } from "@/lib/validation"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { Loader } from "lucide-react"
import { useUserContext } from "@/context/AuthContext"



const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  // its like the middle guy between the frontend and appwrite for easier time fetching data, mutating data, caching
  // const { mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    try {

      // Sign in the newly created user
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast({
          title: "Sign In failed. Please try again",
        });
        return;
      }

      // Check if the user is now authenticated
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Sign Up failed. Please try again" });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast({ title: "An error occurred during signup. Please try again" });
    }
  }
  return (
    <div>
      <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back, Please enter your details
        </p>

        <form
        onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {(isUserLoading || isSigningIn)?(
              <div className="flex-center gap-2">
                <Loader/> Loading...
              </div>
            ):"Sign in"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Dont't have an account?
            <Link
              to="/sign-up  "
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
    </div>
  )
}

export default SigninForm
