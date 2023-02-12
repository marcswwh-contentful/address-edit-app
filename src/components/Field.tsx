// @ts-nocheck
import React, {useState, useEffect, Fragment} from 'react';
import { EditorToolbarButton, Card, List, ListItem, TextField, Button, Select, Option, Table, TableBody, TableCell, TextInput, TableRow, FormLabel, Tab, Icon, Typography, Paragraph, EditorToolbar, DisplayText } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

const Field = (props: FieldProps) => {
/*
	const fieldValue = props.sdk.fields.getValue();
	const [addresses, setAddresses] = useState(fieldValue || []);

	useEffect(() => {
		props.sdk.window.startAutoResizer();
	})

	useEffect(() => {
		const sanitizedAddresses = addresses.map((address) => {
			return { type: address.type, line1: address.line1, line2: address.line2};
		});
		props.sdk.field.setValue(sanitizedAddresses);
	}, [addresses, props.sdk.field]);

	const onAddButtonClicked = () => {
		setAddresses([
			...addresses,
			newAddress
		])
		props.sdk.field.setValue(addresses);
	}

  // update ingredients with new amount
  const onTypeChanged = (e) => {
    const addressIndex = e.target.dataset.index;
    const updatedAddresses = [...addresses];
    updatedAddresses[addressIndex].type = e.target.value;
    setAddresses(updatedAddresses);
  }

const onDeleteButtonClicked = (e) => {
	const addressIndex = parseInt(e.target.datast.index);
	const updatedAddresses = addresses.filter((_, index) => index !== addressIndex );
	setAddresses(updatedAddresses);

}

return 
	<section>
		<div>
			<Table>
				<TableBody>
					{addresses.map((address, index) => {
						<TableCell>
							<TextInput
								value={address.line1}
								placeholder='Line1'
								data-index={index}
							></TextInput>
						</TableCell>
					})}
				</TableBody>
			</Table>
		</div>
	</section>
};
*/

	const [newAddress, setNewAddress] = useState({type: '', line1: '', line2: '', city: '', region: '', postalzip: '', country: ''});
	//let addresses = [{line1: '23 Spragg Circle', line2: 'Unit #1'}];
	//props.sdk.field.setValue({list: addresses});
	const [addresses, setAddresses] = useState(props.sdk.field.getValue().list);
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  //if(props.sdk.field.getValue())
	//addresses.push(props.sdk.field.getValue().list)
	props.sdk.window.updateHeight();
useEffect(() => {
	props.sdk.window.startAutoResizer();
}, [])

props.sdk.field.onValueChanged((value) => {
	if(value.list.length !== addresses.length) {
		setAddresses(value.list);
	}
});

	const updateAddressValue = () => {
		removeAddressValue(newAddress);
		props.sdk.field.setValue({list: props.sdk.field.getValue().list.concat([newAddress])})
		setNewAddress({type: '', line1: '', line2: '', city: '', region: '', postalzip: '', country: ''})
	}

	const removeAddressValue = (address) => {
		props.sdk.field.setValue(
			{list: props.sdk.field.getValue().list.filter(addy => addy.type !== address.type)}
		);
	}


	const editAddressValue = (address) => {
		setNewAddress({type: address.type, line1: address.line1, line2: address.line2, city: address.city, region: address.region, postalzip: address.postalzip, country: address.country});
	}

	const onDeleteButtonClicked = (e) => {
		//const addressIndex = parseInt(e.target.dataset.index);
		console.log(e);
		//const updatedAddreses = addresses.filter(addy => addy.line1 !== e.line1);
		//setAddresses(updatedAddreses);
	}
  //const addresses = props.sdk.field.getValue().list;
  return (
	  <div>
			<Table>
				<TableBody>
					{addresses.map((address, index) => (
						<TableRow>
							<TableCell>
								<Icon icon="Asset" />
							</TableCell>
							<TableCell>
								<Paragraph>{address.type}</Paragraph>
							</TableCell>
							<TableCell>
									<Typography>
										<Paragraph>{address.line1} ...</Paragraph>
									</Typography>
							</TableCell>
							<TableCell>
							<EditorToolbarButton 
                        icon="Edit"
						data-index={address}
						onClick={() => editAddressValue(address)}
                        >
                      </EditorToolbarButton>
							<EditorToolbarButton 
                        icon="Delete"
						data-index={address}
						onClick={() => removeAddressValue(address)}
                        >
                      </EditorToolbarButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>
							<FormLabel>Type</FormLabel>
						</TableCell>
						<TableCell colSpan="3">
							{/* <Select id="addressType" value={newAddress.type} onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value})} name="addressType" width="small"> 
								<Option value="1">Physical</Option>
								<Option value="2">Mailing</Option>
							</Select>
					*/}
							<Select id="addressType" value={newAddress.type} onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value})} width="small">
								<Option value="">-- Select --</Option>
								<Option value="1">Physical</Option>
								<Option value="2">Mailing</Option>
							</Select>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<FormLabel>Line 1</FormLabel>
						</TableCell>
						<TableCell colSpan="3">
							<TextInput value={newAddress.line1} onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value})} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<FormLabel>Line 2</FormLabel>
						</TableCell>
						<TableCell colSpan="3">
						<TextInput value={newAddress.line2} onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value})} />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<FormLabel>City</FormLabel>
						</TableCell>
						<TableCell>
							<TextInput style = {{width: 200}} value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value})} />
						</TableCell>
						<TableCell>
							<FormLabel>Region</FormLabel>
						</TableCell>
						<TableCell>
							<Select id="addressRegion" value={newAddress.region} onChange={(e) => setNewAddress({ ...newAddress, region: e.target.value})} name="addressRegion" width="medium">
								<Option value="">-- Select --</Option>
								<Option value="AB">Alberta</Option>
								<Option value="BC">British Columbia</Option>
								<Option value="MB">Manitoba</Option>
								<Option value="NB">New Brunswick</Option>
								<Option value="NL">Newfoundland</Option>
								<Option value="NS">Nova Scotia</Option>
								<Option value="ON">Ontario</Option>
								<Option value="PE">P.E.I</Option>
								<Option value="QC">Quebec</Option>
								<Option value="QC">Saskatchewan</Option>
							</Select>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<FormLabel>Postal/Zip</FormLabel>
						</TableCell>
						<TableCell>
							<TextInput style = {{width: 100}} value={newAddress.postalzip} onChange={(e) => setNewAddress({ ...newAddress, postalzip: e.target.value})} />
						</TableCell>
						<TableCell>
							<FormLabel>Country</FormLabel>
						</TableCell>
						<TableCell>
							<Select id="addressCountry" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value})} name="addressCountry" width="medium">
								<Option value="">-- Select --</Option>
								<Option value="CA">CANADA</Option>
								<Option value="DO">DOMINICAN REPUBLIC</Option>
								<Option value="DO">JAMAICA</Option>
							</Select>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan="4">
							<Button onClick={updateAddressValue}>Add</Button>		
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
	  </div>


  )
};
/*
<List>
{addresses.map(address => (
	<ListItem key={address.line1}>{address.line1} {address.line2}
		<Button buttonType="negative" onClick={() => removeAddressValue(address)}>x</Button>
	</ListItem>
))}
</List>
<Select id="addressType" name="addressType" width="small">
<Option value="1">Physical</Option>
<Option value="2">Mailing</Option>
</Select>
<TextField style = {{width: 10}} value={newAddress.line1} onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value})} labelText="line1" />
<TextField width="small" value={newAddress.line2} onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value})} labelText="line2" />
<Button onClick={updateAddressValue}>Add</Button>
*/

export default Field;
