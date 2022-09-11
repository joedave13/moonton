import Authenticated from "@/Layouts/Authenticated/index";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import "../../../../css/input.css";
import "../../../../css/button.css";
import { Head, useForm } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        is_feature: false,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.dashboard.movie.store"));
    };

    return (
        <Authenticated auth={auth}>
            <Head>
                <title>Create New Movie</title>
            </Head>
            <h1 className="text-xl">Create New Movie</h1>
            <hr className="my-4" />

            <form onSubmit={submit} autoComplete="off">
                <Label forInput="title" value="Title" />
                <Input
                    type="text"
                    name="title"
                    placeHolder="Movie title..."
                    value={data.title}
                    handleChange={onHandleChange}
                    variant="primary-outline"
                    isError={errors.title}
                />
                <InputError message={errors.title} className="mt-2" />

                <Label forInput="category" value="Category" className="mt-6" />
                <Input
                    type="text"
                    name="category"
                    placeHolder="Movie category..."
                    value={data.category}
                    handleChange={onHandleChange}
                    variant="primary-outline"
                    isError={errors.category}
                />
                <InputError message={errors.category} className="mt-2" />

                <Label
                    forInput="video_url"
                    value="Video URL"
                    className="mt-6"
                />
                <Input
                    type="text"
                    name="video_url"
                    placeHolder="Movie video url..."
                    value={data.video_url}
                    handleChange={onHandleChange}
                    variant="primary-outline"
                    isError={errors.video_url}
                />
                <InputError message={errors.video_url} className="mt-2" />

                <Label
                    forInput="thumbnail"
                    value="Thumbnail"
                    className="mt-6"
                />
                <Input
                    type="file"
                    name="thumbnail"
                    placeHolder="Movie thumbnail"
                    handleChange={onHandleChange}
                    variant="primary-outline"
                    isError={errors.thumbnail}
                />
                <InputError message={errors.thumbnail} className="mt-2" />

                <Label forInput="rating" value="Rating" className="mt-6" />
                <Input
                    type="number"
                    name="rating"
                    placeHolder="Movie rating..."
                    value={data.rating}
                    handleChange={onHandleChange}
                    variant="primary-outline"
                    isError={errors.rating}
                />
                <InputError message={errors.rating} className="mt-2" />

                <div className="flex flex-row mt-6 items-center">
                    <Label
                        forInput="is_feature"
                        value="Is Feature"
                        className="mr-3 mt-1"
                    />
                    <Checkbox
                        name="is_feature"
                        value={data.is_feature}
                        handleChange={(e) =>
                            setData("is_feature", e.target.checked)
                        }
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    processing={processing}
                    className="mt-4"
                >
                    Save
                </Button>
            </form>
        </Authenticated>
    );
}
