  "use client"
  import '@radix-ui/themes/styles.css';
  import { useEffect, useState } from 'react';
  import { Button,Flex, Table, TableColumnHeaderCell } from '@radix-ui/themes';
  import Link from 'next/link';
  import { FaEdit } from "react-icons/fa";
  import { AiOutlineDelete } from "react-icons/ai";
  import { RiDeleteBin7Fill } from "react-icons/ri";
import Pagination from './Pagination';


  interface Values{
    id:string,
    name:string,
    email:string,
    role:string
  }

  export default function Home({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const page = searchParams['page'] ?? '1'
    const per_page = searchParams['per_page'] ?? '10';
    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page) // 5, 10, 15 ...
    const [initialData, setInitialData] = useState<Values[]>([]);
    var [data, setData] = useState<Values[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectAll,setSelectAll]=useState(false);
    const [searchText, setSearchText] = useState("");
    const[loading,setLoading]=useState(false);
    useEffect(() => {
      setLoading(true)
      fetchData();
      setLoading(false);
    }, []);

    useEffect(() => {
      const filteredData = initialData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.role.toLowerCase().includes(searchText.toLowerCase())
      );
  
      setData(filteredData);
    }, [searchText,initialData]);
    const fetchData = async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const newData:Values[] = await response.json();
        newData.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        setData(newData);
        setInitialData(newData)
        console.log("Fetched data successfully:");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

     const cutData = data.slice(start, end)

    const handleCheckboxChange=(id:string)=>{
      setSelectedRows((previousSelectedRows)=>{
        if(previousSelectedRows.includes(id)){
          return previousSelectedRows.filter((rowId)=>rowId!==id)
        }else{
          return [...previousSelectedRows,id]
        }
      })
    }


    
    const handleDeleteRow = (id: string) => {
      
      setData((prevData) => prevData.filter((item) => item.id !== id));
      
    };
  
    const handleDeleteSelected = () => {
      if (selectAll) {
        setData((prevData) => prevData.filter((item) => !selectedRows.includes(item.id) && parseInt(item.id) >= start && parseInt(item.id) < end));
        data=data.splice(start,end)
        setData(data)
        
      } else {
        setData((prevData) => prevData.filter((item) => !selectedRows.includes(item.id)));
      }
      setSelectedRows([]);
    };
    const handleSelectAll = () => {
      setSelectAll(!selectAll);
    };
   

    return (
      <main className="flex w-full min-h-screen flex-col items-center p-24">
          <div className=' w-3/4 flex justify-between mb-6' >
          <div >
            <input className=' w-[300px] outline-none rounded-md shadow-lg border-2  pr-6 pl-2 pt-1'
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            placeholder='Enter Value...'/>
          </div>
          <div >
          <Button color="crimson" variant="soft" onClick={handleDeleteSelected}><RiDeleteBin7Fill className=" text-xl"/></Button>
        </div>
          </div>
        
        <div className='w-3/4'>
        <Table.Root variant='surface' >
          <Table.Header  >
            <Table.Row >
            <TableColumnHeaderCell >
            <input type="checkbox" onClick={handleSelectAll}/>
            </TableColumnHeaderCell>
              <TableColumnHeaderCell >Name</TableColumnHeaderCell>
              <TableColumnHeaderCell className='hidden md:table-cell bg-black'>Email</TableColumnHeaderCell>
              <TableColumnHeaderCell className='hidden md:table-cell'>Role</TableColumnHeaderCell>
              <TableColumnHeaderCell className='hidden md:table-cell'>Actions</TableColumnHeaderCell>
            </Table.Row>

          </Table.Header>
          <Table.Body>
            {cutData.map((user)=>(

              <Table.Row key={user.id}>
                <Table.Cell className='hidden md:table-cell'>
                <input type="checkbox" 
                checked={selectedRows.includes(user.id) || selectAll}
                onChange={() => handleCheckboxChange(user.id)}
                />
                </Table.Cell>
                
                <Table.Cell classNam>
                {user.name}
              
                
                <div className='block md:hidden lowercase'>{user.role}
                </div>
                </Table.Cell>
                <Table.Cell variant="surface" className='hidden md:table-cell'>{user.email}</Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{user.role}</Table.Cell>
                <Table.Cell>
                  <Flex gap="4">
                    <FaEdit/>
                    
                  <AiOutlineDelete onClick={() => handleDeleteRow(user.id)}  color="red"/>
                  </Flex >
                </Table.Cell>

              </Table.Row>
              
            ))}
          

          </Table.Body>

        </Table.Root>
        
        </div>
        <div className=' items-end'>
        <Pagination
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
      />
        </div>
        
      </main>
    );
  }
