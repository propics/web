"use client";

import { FormEvent, useState } from "react";

export function TrialForm() {
	const [type, setType] = useState<"individual" | "company">("individual");
	const [status, setStatus] = useState("");

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("Sending...");

		const form = event.currentTarget;
		const formData = new FormData(form);
		const data: Record<string, string> = { userType: type };

		formData.forEach((value, key) => {
			data[key] = value instanceof File ? value.name : String(value);
		});

		try {
			const response = await fetch("/api/free-trial", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await response.json() as { message?: string };
			setStatus(result.message || "Request sent successfully.");
		} catch {
			setStatus("Connection failed. Please try again.");
		}
	}

	const FileField = ({ name, title }: { name: string; title: string }) => (
		<label>
			<span>{title} <b>*</b></span>
			<div className="file-drop">
				<input name={name} type="file" required />
				<span>Drag and Drop<br />or <em>Select file</em></span>
			</div>
		</label>
	);

	return (
		<form className="trial-form" onSubmit={submit}>
			<section className="trial-section">
				<h2>User Type</h2>
				<div className="user-types">
					<label>
						<input
							type="radio"
							name="userTypeChoice"
							checked={type === "individual"}
							onChange={() => setType("individual")}
						/>
						Individual
					</label>

					<label>
						<input
							type="radio"
							name="userTypeChoice"
							checked={type === "company"}
							onChange={() => setType("company")}
						/>
						Company
					</label>
				</div>
			</section>

			{type === "company" && (
				<section className="trial-section">
					<h2>Company Information</h2>

					<div className="trial-fields">
						<label>
							<span>Company Name <b>*</b></span>
							<input name="company" required placeholder="Company name" />
						</label>

						<label>
							<span>Mobile <b>*</b></span>
							<input name="companyPhone" required placeholder="+966 5XXXXXXXX" />
						</label>

						<label className="wide">
							<span>Official Email <b>*</b></span>
							<input
								name="companyEmail"
								type="email"
								required
								placeholder="name@company.com"
							/>
						</label>

						<FileField
							name="commercialRegistration"
							title="Commercial Registration"
						/>

						<FileField name="taxDocument" title="Tax Document" />
					</div>
				</section>
			)}

			<section className="trial-section">
				<h2>Personal Information</h2>

				<div className="trial-fields">
					<label>
						<span>Full Name <b>*</b></span>
						<input name="name" required placeholder="Your full name" />
					</label>

					<label>
						<span>Mobile <b>*</b></span>
						<input name="phone" required placeholder="+966 5XXXXXXXX" />
					</label>

					<label className="wide">
						<span>Email <b>*</b></span>
						<input
							name="email"
							type="email"
							required
							placeholder="name@email.com"
						/>
					</label>

					<label className="wide">
						<span>ID Document <b>*</b></span>
						<div className="file-drop">
							<input name="idDocument" type="file" required />
							<span>Drag and Drop<br />or <em>Select file</em></span>
						</div>
					</label>
				</div>
			</section>

			<button className="trial-submit" type="submit">
				Start free trial
			</button>

			{status && <p className="form-message">{status}</p>}
		</form>
	);
}
