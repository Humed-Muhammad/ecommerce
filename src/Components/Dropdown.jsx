import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { allMajorCategory } = useSelector((state) => state.products);
  const [selected, setSelected] = useState(allMajorCategory[1]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative w-2/5 ml-3">
            <Listbox.Button className="h-10 relative w-full bg-gray-800 text-white rounded-l shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none  sm:text-sm cursor-pointer ">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selected && selected.major_category}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 w-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {allMajorCategory.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center w-96">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {category.major_category}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
