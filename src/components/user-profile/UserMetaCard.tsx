"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    role: "",
    kelas: "",
  });

  // Ambil data dari sessionStorage saat komponen mount
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      const parsed = JSON.parse(sessionUser);

      setUserData({
        nama: parsed.nama || "",
        email: parsed.email || "",
        role: parsed.role || "",
        kelas: parsed.kelas || "",
      });
    }
  }, []);

  // Simpan hasil edit
  const handleSave = () => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    console.log("Data updated:", userData);
    closeModal();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src="/images/user/owner.jpg"
                alt="user"
              />
            </div>

            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {userData.nama || "Nama User"}
              </h4>

              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userData.role || "Role"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userData.kelas || "Kelas"}
                </p>
              </div>
            </div>

            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              <a
                href="https://www.facebook.com/PimjoHQ"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-gray-700"
              >
                FB
              </a>
              <a
                href="https://x.com/PimjoHQ"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-gray-700"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com/company/pimjo"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-gray-700"
              >
                LI
              </a>
              <a
                href="https://instagram.com/PimjoHQ"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border dark:border-gray-700"
              >
                IG
              </a>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-4 py-3 text-sm font-medium dark:border-gray-700 lg:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Modal Edit */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>

          <form className="flex flex-col">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mt-6">
              <div>
                <Label>Nama</Label>
                <Input
                  type="text"
                  name="nama"
                  value={userData.nama}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input
                  type="text"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Kelas</Label>
                <Input
                  type="text"
                  name="kelas"
                  value={userData.kelas}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
